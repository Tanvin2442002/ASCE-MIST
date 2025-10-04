// Admin authentication utilities
export const isAdminAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem("adminAuth") === "true"
}

export const getAdminEmail = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("adminEmail")
}

export const logoutAdmin = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("adminAuth")
  localStorage.removeItem("adminEmail")
}

export const requireAdminAuth = () => {
  if (!isAdminAuthenticated()) {
    window.location.href = "/admin/login"
    return false
  }
  return true
}
