import Cookies from "js-cookie"

export const setOrderActive = () => {
  Cookies.set("orderStatus", "active")
  Cookies.set("orderTime", Date.now().toString())
}

export const clearOrderStatus = () => {
  Cookies.remove("orderStatus")
  Cookies.remove("orderTime")
}

export const getOrderStatus = () => {
  const status = Cookies.get("orderStatus")
  const time = Cookies.get("orderTime")

  if (status === "active" && time) {
    const orderTimeMs = Number.parseInt(time)
    const elapsedMinutes = Math.floor((Date.now() - orderTimeMs) / 60000)
    const remaining = Math.max(15 - elapsedMinutes, 0)

    return {
      isActive: true,
      remainingTime: remaining,
    }
  }

  return {
    isActive: false,
    remainingTime: 0,
  }
}

