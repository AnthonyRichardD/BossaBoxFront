import React, { useEffect, useState } from "react";
import { ToolService } from "../../../services/toolService";
import { Tool } from "../../../types/tool";

const ToolList: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const data = await ToolService.getAllTools();
        setTools(data.response);
        console.log(tools);
      } catch (err) {
        setError("Failed to fetch tools");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  if (loading) return <div>Loading tools...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Tools</h1>
      <ul>
        {tools.map((tool) => (
          <li key={tool.id}>
            <h2>{tool.title}</h2>
            <p>{tool.description}</p>
            <a href={tool.link} target="_blank" rel="noopener noreferrer">
              Visit Tool
            </a>
            <div>Tags: {tool.tags.join(", ")}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolList;
