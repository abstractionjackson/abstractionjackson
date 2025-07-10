// Utility functions for the application
export class Utils {
  /**
   * Debounce function to limit how often a function can be called
   * @param {Function} func - The function to debounce
   * @param {number} wait - The number of milliseconds to delay
   * @returns {Function} - The debounced function
   */
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function to limit how often a function can be called
   * @param {Function} func - The function to throttle
   * @param {number} limit - The number of milliseconds to throttle
   * @returns {Function} - The throttled function
   */
  static throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /**
   * Format a date to a readable string
   * @param {Date|string} date - The date to format
   * @param {Object} options - Formatting options
   * @returns {string} - The formatted date string
   */
  static formatDate(date, options = {}) {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const defaultOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return dateObj.toLocaleDateString("en-US", {
      ...defaultOptions,
      ...options,
    });
  }

  /**
   * Safely parse JSON with error handling
   * @param {string} jsonString - The JSON string to parse
   * @param {any} defaultValue - The default value to return if parsing fails
   * @returns {any} - The parsed JSON or default value
   */
  static safeJsonParse(jsonString, defaultValue = null) {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.warn("Failed to parse JSON:", e);
      return defaultValue;
    }
  }

  /**
   * Create a DOM element with attributes and content
   * @param {string} tag - The tag name
   * @param {Object} attributes - Attributes to set on the element
   * @param {string|Node} content - Content to add to the element
   * @returns {Element} - The created element
   */
  static createElement(tag, attributes = {}, content = "") {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "className") {
        element.className = value;
      } else if (key === "dataset") {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });

    if (typeof content === "string") {
      element.innerHTML = content;
    } else if (content instanceof Node) {
      element.appendChild(content);
    }

    return element;
  }
}
