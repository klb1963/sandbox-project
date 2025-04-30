import './ConfirmModal.css';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="confirm" onClick={onConfirm}>Удалить</button>
          <button className="cancel" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
}