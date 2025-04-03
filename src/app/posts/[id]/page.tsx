const posts = [
    { id: "1", title: "첫 번째 게시물" },
    { id: "2", title: "두 번째 게시물" },
    { id: "3", title: "세 번째 게시물" },
  ];
  
  export default function PostPage({ params }: { params: { id: string } }) {
    const post = posts.find((p) => p.id === decodeURIComponent(params.id));
  
    if (!post) {
      return <h1 className="text-2xl text-red-500">❌ 해당 포스트를 찾을 수 없습니다.</h1>;
    }
  
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg">📌 이곳에 포스트 내용을 추가하세요.</p>
      </div>
    );
  }
  