
export async function Blog({children}) {
  // await delay(5000);
  const res = await fetch(`https://worldtimeapi.org/api/ip`, {
    cache: 'force-cache',
    next: { tags: ['test-tag'] },
  });
  const data = (await res.json()) as { datetime: string };
  const dateObj = new Date(data.datetime);
  const currentTime = dateObj.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const postId = dateObj.getSeconds();
  // second request
  const resLorem = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    cache: 'force-cache',
    next: { tags: ['test-tag-2'] },
  });

  const dataLorem = (await resLorem.json()) as { title: string; body: string };

  const date = currentTime;
  return (
    <div className="prose prose-sm prose-invert max-w-none">
      <h1 className="text-xl font-bold">{children}</h1>

      <ul>
        <li>
          Time in New York: <span className="text-amber-400">{date}</span>{' '}
          (obtained via fetch)
        </li>
        <li>Lorem ipsum post (obtained via fetch)</li>
        <li>It contains two fetched requests tagged with unique tags.</li>
      </ul>
      <div className="mb-8 grid grid-cols-6 gap-x-6 gap-y-3">
        <div className="col-span-full space-y-3 lg:col-span-4">
          <h1 className="truncate text-2xl font-medium capitalize text-gray-200">
            [{postId}] {dataLorem.title}
          </h1>
          <h3 className="text-gray-200">
            Last snapshot:{' '}
            {new Date().toLocaleString('en-US', {
              timeZone: 'America/New_York',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            })}
          </h3>
          <p className="line-clamp-3 font-medium text-gray-500">
            {dataLorem.body}
          </p>
          {/* client component */}
        </div>
      </div>
    </div>
  );
}