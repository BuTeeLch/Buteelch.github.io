export async function onRequest(context) {
    const max = 261;
    return new Response(await fetch(`https://raw.githubusercontent.com/AutumnVN/chino.webp/main/${Math.ceil(Math.random() * max)}.webp`).then((res) => res.blob()), {
        headers: {
            'content-type': 'image/webp',
            'cache-control': 'public, max-age=0'
        }
    });
}
