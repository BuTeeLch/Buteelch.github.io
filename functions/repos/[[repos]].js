export async function onRequest(context) {
    const path = new URL(context.request.url).pathname;
    const ownerName = ['AutumnVN', 'Vendicated'];
    if (path.split('/').length !== 4 || !ownerName.includes(path.split('/')[2])) {
        return new Response('Nope');
    }

    const { stargazers_count, forks_count } = await (await fetch(`https://api.github.com${path}`, {
        headers: {
            'accept': 'application/vnd.github.v3+json',
            'authorization': `bearer ${context.env.GITHUB_TOKEN}`,
            'user-agent': 'AutumnVN'
        }
    })).json();

    const res = {
        star: stargazers_count,
        fork: forks_count
    };

    return new Response(JSON.stringify(res, null, 2), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'cache-control': 'public, max-age=3600'
        }
    });
}
