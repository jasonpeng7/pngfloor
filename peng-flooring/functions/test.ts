export async function onRequest() {
  return new Response(
    JSON.stringify({ message: "Cloudflare Pages function is working!" }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
