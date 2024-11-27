function SnippetList({ snippets }) {
    return (
        <div>
            {snippets.map(snippet => (
                <div key={snippet.id} className="border p-4 rounded mb-4">
                    <h2 className="text-xl font-bold">{snippet.title}</h2>
                    <pre className="bg-gray-100 p-2 rounded">
                        {snippet.code}
                    </pre>
                    <p className="text-gray-600">Language: {snippet.language}</p>
                    <p className="text-gray-600">Tags: {snippet.tags}</p>
                </div>
            ))}
        </div>
    );
}

export default SnippetList;
