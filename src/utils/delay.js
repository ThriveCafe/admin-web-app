const delay = (time = 0) =>
  new Promise((res) => {
    setTimeout(() => res(), time)
  })

export default delay
