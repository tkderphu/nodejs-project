import React, { ReactNode, useEffect } from 'react';
import './Modal.css'; // You'll create this CSS

interface CustomModalProps {
  show: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSave?: () => void;
  closable?: boolean;
  large?: boolean
}

const ModalComponent: React.FC<CustomModalProps> = ({
  show,
  title,
  children,
  onClose,
  onSave,
  closable = true,
  large = false
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal" style={{maxWidth: (large ? "800px" : "500px")}}>
        <div className="custom-modal-header">
          <h2>{title}</h2>
          { (
            <button className="custom-modal-close" onClick={onClose}>
              &times;
            </button>
          )}
        </div>
        <div className="custom-modal-body">{children}</div>
        <div className="custom-modal-footer">
          {closable && (
            <button onClick={onClose} className="custom-button secondary">
            Đóng
          </button>
          )}
          {onSave && (
            <button onClick={onSave} className="custom-button primary">
              Lưu thay đổi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
