import React, { useContext, useEffect, useState } from "react";
import ToastContext from "./ToastContext";
import "./Toast.css";

/* ── Animated SVG Icons ── */
const SuccessIcon = () => (
  <div className="toast-icon toast-icon--success">
    <svg viewBox="0 0 52 52" className="toast-svg">
      <circle className="toast-circle" cx="26" cy="26" r="25" fill="none" />
      <path className="toast-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>
  </div>
);

const ErrorIcon = () => (
  <div className="toast-icon toast-icon--error">
    <svg viewBox="0 0 52 52" className="toast-svg">
      <circle className="toast-circle" cx="26" cy="26" r="25" fill="none" />
      <path className="toast-cross toast-cross--1" fill="none" d="M16 16 36 36" />
      <path className="toast-cross toast-cross--2" fill="none" d="M36 16 16 36" />
    </svg>
  </div>
);

const WarningIcon = () => (
  <div className="toast-icon toast-icon--warning">
    <svg viewBox="0 0 52 52" className="toast-svg">
      <circle className="toast-circle" cx="26" cy="26" r="25" fill="none" />
      <line className="toast-excl-line" x1="26" y1="15" x2="26" y2="30" />
      <circle className="toast-excl-dot" cx="26" cy="37" r="2.5" />
    </svg>
  </div>
);

const InfoIcon = () => (
  <div className="toast-icon toast-icon--info">
    <svg viewBox="0 0 52 52" className="toast-svg">
      <circle className="toast-circle" cx="26" cy="26" r="25" fill="none" />
      <circle className="toast-info-dot" cx="26" cy="16" r="2.5" />
      <line className="toast-info-line" x1="26" y1="23" x2="26" y2="38" />
    </svg>
  </div>
);

const LoadingIcon = () => (
  <div className="toast-icon toast-icon--loading">
    <div className="toast-spinner" />
  </div>
);

const iconMap = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
  loading: LoadingIcon,
};

/* ── Single Toast Item ── */
const ToastItem = ({ toast, onDismiss }) => {
  const [progress, setProgress] = useState(100);
  const IconComponent = iconMap[toast.type] || InfoIcon;

  useEffect(() => {
    if (toast.type === "loading" || toast.exiting) return;

    const start = toast.createdAt;
    const end = start + toast.duration;
    let raf;

    const tick = () => {
      const now = Date.now();
      const remaining = Math.max(0, ((end - now) / toast.duration) * 100);
      setProgress(remaining);
      if (remaining > 0) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [toast]);

  return (
    <div
      className={`toast-item toast-item--${toast.type} ${
        toast.exiting ? "toast-item--exit" : "toast-item--enter"
      }`}
      role="alert"
    >
      <div className="toast-body">
        <IconComponent />
        <span className="toast-message">{toast.message}</span>
        <button
          className="toast-close"
          onClick={() => onDismiss(toast.id)}
          aria-label="Close notification"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {toast.type !== "loading" && (
        <div className="toast-progress-track">
          <div
            className={`toast-progress-bar toast-progress--${toast.type}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

/* ── Toast Container ── */
const ToastContainer = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
