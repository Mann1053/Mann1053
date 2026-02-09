import { showToast } from "./common";

/**
 * Common API error handler
 * Handles error responses from API calls and displays appropriate toast messages
 * 
 * @param {Object} error - The error object from axios
 * @param {string} defaultMessage - Default error message if no specific error is found
 * @returns {Object} - Returns an object with error information
 */
export const handleApiError = (error, defaultMessage = "An error occurred") => {
  let errorMessage = defaultMessage;
  let statusCode = null;

  // Check if error has a response (API error)
  if (error?.response) {
    statusCode = error.response.status;
    
    // Priority order for error messages:
    // 1. error field in response data
    // 2. message field in response data
    // 3. statusText
    // 4. default message
    errorMessage = 
      error.response.data?.error || 
      error.response.data?.message || 
      error.response.statusText || 
      defaultMessage;

    // Handle specific status codes
    switch (statusCode) {
      case 400:
        errorMessage = error.response.data?.error || error.response.data?.message || "Bad request. Please check your input.";
        break;
      case 401:
        errorMessage = "Unauthorized. Please login again.";
        break;
      case 403:
        errorMessage = error.response.data?.error || error.response.data?.message || "Access denied. You don't have permission to perform this action.";
        break;
      case 404:
        errorMessage = error.response.data?.error || error.response.data?.message || "Resource not found.";
        break;
      case 409:
        errorMessage = error.response.data?.error || error.response.data?.message || "Conflict. Resource already exists.";
        break;
      case 422:
        errorMessage = error.response.data?.error || error.response.data?.message || "Validation error. Please check your input.";
        break;
      case 500:
        errorMessage = "Server error. Please try again later.";
        break;
      case 503:
        errorMessage = "Service unavailable. Please try again later.";
        break;
      default:
        break;
    }
  } else if (error?.request) {
    // Network error (no response received)
    errorMessage = "Network error. Please check your internet connection.";
  } else if (error?.message) {
    // Other errors
    errorMessage = error.message;
  }

  // Show toast notification
  showToast(errorMessage, "error");

  return {
    error: true,
    message: errorMessage,
    statusCode,
    originalError: error
  };
};

/**
 * Check if an API response contains an error
 * 
 * @param {Object} response - The response object from API
 * @returns {boolean} - Returns true if response contains an error
 */
export const isApiError = (response) => {
  return (
    response?.error || 
    response?.response?.data?.error || 
    (response?.response?.status && response.response.status >= 400)
  );
};