import { useRef, useState } from "react";
import s from "./Modal.module.scss";
import { v4 } from "uuid";

type TModalProps<T = null> = {
  id?: string;
  children: (args?: T) => React.ReactNode;
  onCancel?: () => void;
  onSubmit?: (args?: T) => void;
  danger?: boolean;
  // actionProps?: T;
  className?: string;
  title?: string;
  buttons?: React.ReactNode[];
};
export function Modal<T = object>({
  id,
  className,
  children,
  onCancel,
  onSubmit,
  buttons = [],
  // actionProps = { } as T,
  danger = false,
  title,
}: TModalProps<T>) {
  const ref = useRef<HTMLDialogElement>(null);

  const ChildrenElement = children();
  const preventMouseScroll = (e: React.WheelEvent<HTMLDialogElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <dialog
      ref={ref}
      id={id}
      className={[className, s.modal].join(" ")}
      onScroll={preventMouseScroll}
    >
      {title && <h1>{title}</h1>}
      <div className={s.modalContent}>
        {ChildrenElement}
        <div className={s.modalFooter}>
          <button
            onClick={() => {
              onCancel && onCancel();
              const dialog = document.getElementById(
                `${id}`
              ) as HTMLDialogElement;
              dialog?.close();
              if (!ref.current) return;
              ref.current.close();
            }}
          >
            Cancel
          </button>
          {buttons}
          <button
            onClick={() => {
              onSubmit && onSubmit();
              if (!ref.current) return;
              ref.current.close();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
}

export function useModal<T>(
  props: TModalProps<T> & {
    actionPropsDefault?: T;
  }
): [
  modal: JSX.Element,
  options: {
    showModal: (props?: T) => void;
    hideModal: () => void;
    // setActionProps: (args: T) => void;
  }
] {
  //
  const { id = `modal_${v4()}`, children, onCancel, onSubmit, danger } = props;

  const showModal = () => {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog?.showModal();
    const rootElement = document.getElementsByTagName("html")[0];
    rootElement.style.overflow = "hidden";
  };
  const hideModal = () => {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog?.close();
    const rootElement = document.getElementsByTagName("html")[0];
    rootElement.style.overflow = "auto";
  };
  const preparedSubmit = () => {
    onSubmit && onSubmit();
    hideModal();
  };

  const modal = (
    <Modal
      id={id}
      onCancel={onCancel || hideModal}
      onSubmit={preparedSubmit}
      danger={danger}
      className={props.className}
      buttons={props.buttons}
      title={props.title || "Just one more thing before you proceed..."}
    >
      {children}
    </Modal>
  );

  return [
    modal,
    {
      showModal,
      hideModal,
    },
  ];
}
