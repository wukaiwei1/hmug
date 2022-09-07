// 常规提示
function toast(title, duration = 3000) {
  uni.showToast({
    title,
    icon: "none",
    duration
  })
}
// 错误提示 toast.err('网络错误')
toast.err = function(title, duration = 3000) {
  uni.showToast({
    title,
    icon: "error",
    duration
  })
}

// 成功提示 toast.success('请求成功')
toast.success = function(title, duration = 3000) {
  uni.showToast({
    title,
    icon: "success",
    duration
  })
}

// 成功提示 toast.success('请求成功')
toast.loading = function(title, duration = 3000) {
  uni.showToast({
    title,
    icon: "loading",
    duration
  })
}
export default toast
