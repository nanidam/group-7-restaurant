import "../style/UpdateBookingConfirmation.scss";

interface UpdateBookingConfirmationProps {
  onClose: () => void;
  onCancel: () => void;
}

export function UpdateBookingConfirmation({
  onClose,
  onCancel,
}: UpdateBookingConfirmationProps) {
  function handleOKClick() {
    onClose(); // Call the onClose function from props to close the confirmation
    onCancel();
  }

  return (
    <div className="confirm-wrapper">
      <div className="confirm-box">
        <p className="confirm-text">The booking has been updated! :)</p>
        <button onClick={handleOKClick}>OK</button>
      </div>
    </div>
  );
}
