"use client";

import { useState, useCallback } from "react";
import Layout from "../../components/Layout/main";
import markdownToHtml from "../../utils/markdownToHtml";
import Button from "../../components/shared/button";
import Table from "../../components/blog/writing/table";

function PreviewWindow({ title, markdown }) {
    return (
        <div className="mb-5 rounded-lg border border-gray-200 shadow-small dark:border-gray-700 dark:bg-gray-800">
            <h1 className="m-4 p-4 text-left text-xl font-bold">
                You are <span className="text-blue-600">writing</span> now
            </h1>
            <hr />
            <div className="trasnform m-4 max-h-96 overflow-y-auto p-4 transition-all duration-500">
                {title !== "" ? (
                    <h1 className="text-left text-xl font-bold">{title}</h1>
                ) : (
                    <div className="text-left text-xl font-bold">Untitled</div>
                )}
                <p className="mt-4 text-sm font-bold text-gray-500 dark:text-gray-300">
                    {new Date().toLocaleDateString()}
                </p>
                <div className="prose prose-slate dark:prose-invert lg:prose-lg prose-a:text-blue-600 prose-img:rounded-xl">
                    {markdown !== "" ? (
                        <div dangerouslySetInnerHTML={{ __html: markdown }} />
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function NewBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [markdown, setMarkdown] = useState("");

    const preview = useCallback(() => {
        if (content !== "") {
            markdownToHtml(content).then((res) => {
                setMarkdown(res);
            });
        } else {
            setMarkdown("");
        }
    }, [content]);

    return (
        <Layout>
            <div className="container mx-auto max-w-4xl p-8">
                <div className="mb-28">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-3xl font-bold">Welcome Back IE Hung</h1>
                        <h3 className="mt-4 bg-gradient-to-tr from-sky-400 to-blue-200 bg-clip-text text-2xl font-bold text-transparent">
                            Let&apos;s start writing
                        </h3>
                    </div>
                </div>
                <PreviewWindow title={title} markdown={markdown} />
                <div className="relative mb-10">
                    <input
                        className="focus:shadow-outline mb-2 h-12 w-full rounded-lg border px-3 text-base text-gray-700 placeholder-gray-600 dark:text-white placeholder:dark:text-white"
                        type="text"
                        placeholder="Give me a Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="focus:shadow-outline h-64 w-full rounded-lg border px-3 py-2 text-base text-gray-700 placeholder-gray-600 dark:text-white placeholder:dark:text-white"
                        placeholder="# Write down your ideas Today is ...✨"
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="flex justify-end space-x-4">
                        <Button className="bg-green-500" onClick={() => alert("Don&apos;t click Me!")}>Publish</Button>
                        <Button className="bg-yellow-500" onClick={preview}>
                            Preview
                        </Button>
                    </div>
                </div>
                <div className="mb-32">
                    <Table />
                </div>
            </div>
        </Layout>
    );
}
