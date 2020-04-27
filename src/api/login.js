import service from "@/utils/request";
export function login(data) {
  return service.request({
    method: "post",
    url: "/oauth/token",
    data
  });
}
