
export const getHost = () => {
  let protocol = window.location.protocol;
  let slashes = protocol.concat("//");
  let host = slashes.concat(window.location.host)
  return host;
}