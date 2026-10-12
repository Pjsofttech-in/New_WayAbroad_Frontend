import React, { useEffect, useRef, useState } from "react";
import "./coursefinder-plain-ui.css";

/* =====================================================
   COMMON HELPERS
===================================================== */

const cx = (...items) => items.filter(Boolean).join(" ");

/* =====================================================
   LAYOUT COMPONENTS
===================================================== */

export function Container({
  children,
  maxWidth,
  className,
  sx,
  ...props
}) {
  return (
    <div
      className={cx("cf-container", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Box({
  children,
  className,
  sx,
  onClick,
  ...props
}) {
  return (
    <div
      className={cx("cf-box", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

/* =====================================================
   TYPOGRAPHY
===================================================== */

export function Typography({
  children,
  variant,
  component,
  className,
  fontWeight,
  color,
  gutterBottom,
  ...props
}) {
  const Tag =
    component ||
    {
      h4: "h4",
      h3: "h3",
      h2: "h2",
      subtitle1: "div",
      body2: "p",
      body1: "p",
      caption: "span",
    }[variant] ||
    "div";

  return (
    <Tag
      className={cx(
        "cf-typography",
        `cf-${variant || "body"}`,
        ["bold", "medium"].includes(fontWeight)
          ? `cf-weight-${fontWeight}`
          : "",
        color === "text.secondary" ? "cf-muted" : "",
        gutterBottom ? "cf-gutter-bottom" : "",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* =====================================================
   FORM COMPONENTS
===================================================== */

export function FormControl({
  children,
  className,
  ...props
}) {
  return (
    <div
      className={cx("cf-form-control", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function InputLabel({
  children,
  className,
  ...props
}) {
  return (
    <label
      className={cx("cf-input-label", className)}
      {...props}
    >
      {children}
    </label>
  );
}

/* =====================================================
   DROPDOWN MENU ITEM
===================================================== */

export function MenuItem({
  children,
  value,
  onClick,
  disabled,
  className,
  ...props
}) {
  return (
    <div
      role="option"
      aria-disabled={disabled || undefined}
      className={cx("cf-menu-item", className)}
      data-value={value}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

/* =====================================================
   SELECT / DROPDOWN
===================================================== */

export function Select({
  children,
  value,
  onChange,
  multiple,
  label,
  disabled,
  renderValue,
  className,
  MenuProps,
  ...props
}) {
  const [open, setOpen] = useState(false);

  // Reference to the complete dropdown wrapper
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    // Also handle touch interactions
    document.addEventListener(
      "touchstart",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "touchstart",
        handleOutsideClick
      );
    };
  }, [open]);

  const values = Array.isArray(value) ? value : [];

  const displayValue = renderValue
    ? renderValue(multiple ? values : value)
    : value !== undefined &&
        value !== null &&
        value !== ""
      ? String(value)
      : label || "Select";

  // Handle selecting and deselecting options
  const selectItem = (itemValue) => {
    if (multiple) {
      const next = values.includes(itemValue)
        ? values.filter((item) => item !== itemValue)
        : [...values, itemValue];

      onChange?.({
        target: {
          value: next,
        },
      });

      return;
    }

    onChange?.({
      target: {
        value: itemValue,
      },
    });

    // Close after selecting a single option
    setOpen(false);
  };

  // Render dropdown children
  const renderChild = (child, index) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.type === MenuItem) {
      // Custom menu content, such as the search field
      if (child.props.value === undefined) {
        return (
          <div
            key={`custom-${index}`}
            className="cf-dropdown-custom"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {child}
          </div>
        );
      }

      const selected = multiple
        ? values.includes(child.props.value)
        : value === child.props.value;

      return (
        <div
          key={child.key ?? index}
          className={cx(
            "cf-menu-option",
            selected && "is-selected",
            child.props.disabled && "is-disabled"
          )}
          role="option"
          aria-selected={selected}
          onClick={() => {
            if (!child.props.disabled) {
              selectItem(child.props.value);
            }
          }}
        >
          {child.props.children}
        </div>
      );
    }

    return React.cloneElement(child, {
      key: child.key ?? index,
    });
  };

  return (
    <div
      ref={selectRef}
      className={cx("cf-select-wrap", className)}
      {...props}
    >
      <button
        type="button"
        className="cf-select"
        disabled={disabled}
        aria-expanded={open}
        onClick={() =>
          setOpen((previous) => !previous)
        }
      >
        <span className="cf-select-value">
          {displayValue}
        </span>

        <span
          className="cf-chevron"
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {open && !disabled && (
        <div
          className="cf-dropdown"
          role="listbox"
          aria-multiselectable={multiple || undefined}
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          {React.Children.map(
            children,
            renderChild
          )}
        </div>
      )}
    </div>
  );
}


/* =====================================================
   CHECKBOX
===================================================== */

export function Checkbox({
  checked,
  onChange,
  className,
  ...props
}) {
  return (
    <input
      type="checkbox"
      className={cx("cf-checkbox", className)}
      checked={!!checked}
      onChange={(event) => onChange?.(event.target.checked)}
      {...props}
    />
  );
}

/* =====================================================
   LIST ITEM TEXT
===================================================== */

export function ListItemText({
  primary,
  className,
}) {
  return (
    <span className={cx("cf-list-item-text", className)}>
      {primary}
    </span>
  );
}

/* =====================================================
   TEXT FIELD / SEARCH INPUT
===================================================== */

export function TextField({
  value,
  onChange,
  placeholder,
  disabled,
  fullWidth,
  size,
  className,
  slotProps,
  ...props
}) {
  const inputProps = slotProps?.input || {};

  return (
    <div
      className={cx(
        "cf-text-field",
        fullWidth && "cf-full-width",
        size === "small" && "cf-text-field-small",
        className
      )}
    >
      {inputProps.startAdornment && (
        <span className="cf-adornment">
          {inputProps.startAdornment}
        </span>
      )}

      <input
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />

      {inputProps.endAdornment && (
        <span className="cf-adornment">
          {inputProps.endAdornment}
        </span>
      )}
    </div>
  );
}

/* =====================================================
   INPUT ADORNMENT
===================================================== */

export function InputAdornment({
  children,
  position,
}) {
  return (
    <span
      className={`cf-input-adornment cf-adornment-${position || "start"}`}
    >
      {children}
    </span>
  );
}

/* =====================================================
   BUTTON
===================================================== */

export function Button({
  children,
  onClick,
  disabled,
  variant,
  size,
  endIcon,
  className,
  ...props
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "cf-button",
        `cf-button-${variant || "text"}`,
        `cf-button-${size || "medium"}`,
        className
      )}
      {...props}
    >
      {children}

      {endIcon && (
        <span className="cf-button-icon">
          {endIcon}
        </span>
      )}
    </button>
  );
}

/* =====================================================
   ICON BUTTON
===================================================== */

export function IconButton({
  children,
  onClick,
  disabled,
  className,
  ...props
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cx("cf-icon-button", className)}
      {...props}
    >
      {children}
    </button>
  );
}

/* =====================================================
   TOOLTIP
===================================================== */

export function Tooltip({ children, title }) {
  return (
    <span className="cf-tooltip-wrap" title={title}>
      {children}
    </span>
  );
}

/* =====================================================
   ALERT
===================================================== */

export function Alert({
  children,
  severity = "info",
  onClose,
}) {
  return (
    <div
      className={`cf-alert cf-alert-${severity}`}
      role="alert"
    >
      <span>{children}</span>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
}

/* =====================================================
   LOADING INDICATOR
===================================================== */

export function CircularProgress() {
  return (
    <span
      className="cf-spinner"
      role="status"
      aria-label="Loading"
    />
  );
}

/* =====================================================
   CARD COMPONENTS
===================================================== */

export function Card({
  children,
  className,
  ...props
}) {
  return (
    <div
      className={cx("cf-card", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
  ...props
}) {
  return (
    <div
      className={cx("cf-card-content", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* =====================================================
   PAGINATION
===================================================== */

export function Pagination({
  count = 1,
  page = 1,
  onChange,
  showFirstButton,
  showLastButton,
}) {
  const totalPages = Math.max(1, Number(count) || 1);
  const currentPage = Math.min(
    Math.max(1, Number(page) || 1),
    totalPages
  );

  const changePage = (nextPage) => {
    onChange?.(null, nextPage);
  };

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav
      className="cf-pagination"
      aria-label="Pagination"
    >
      {showFirstButton && (
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => changePage(1)}
          aria-label="First page"
        >
          «
        </button>
      )}

      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => changePage(currentPage - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          className={pageNumber === currentPage ? "active" : ""}
          aria-current={pageNumber === currentPage ? "page" : undefined}
          onClick={() => changePage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => changePage(currentPage + 1)}
        aria-label="Next page"
      >
        ›
      </button>

      {showLastButton && (
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => changePage(totalPages)}
          aria-label="Last page"
        >
          »
        </button>
      )}
    </nav>
  );
}

/* =====================================================
   ICON REPLACEMENTS
===================================================== */

export const InfoOutlinedIcon = () => (
  <span aria-hidden="true">ⓘ</span>
);

export const ExpandMoreIcon = () => (
  <span aria-hidden="true">⌄</span>
);

export const ExpandLessIcon = () => (
  <span aria-hidden="true">⌃</span>
);

export const SearchIcon = () => (
  <span aria-hidden="true">⌕</span>
);

export const ClearIcon = () => (
  <span aria-hidden="true">×</span>
);