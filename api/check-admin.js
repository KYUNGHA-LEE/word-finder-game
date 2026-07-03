export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      ok: false,
      message: "POST 요청만 허용됩니다."
    });
  }

  try {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return response.status(500).json({
        ok: false,
        message: "서버에 ADMIN_PASSWORD가 설정되지 않았습니다."
      });
    }

    const body =
      typeof request.body === "string"
        ? JSON.parse(request.body || "{}")
        : request.body || {};

    const password = body.password;

    if (!password) {
      return response.status(400).json({
        ok: false,
        message: "비밀번호가 없습니다."
      });
    }

    if (password !== adminPassword) {
      return response.status(401).json({
        ok: false,
        message: "비밀번호가 틀렸습니다."
      });
    }

    return response.status(200).json({
      ok: true,
      message: "강사 인증 성공"
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      message: "요청 처리 중 오류가 발생했습니다."
    });
  }
}
