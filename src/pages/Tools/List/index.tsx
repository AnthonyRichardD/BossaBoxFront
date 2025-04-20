import type React from "react";
import { useEffect, useState } from "react";
import { ToolService } from "../../../services/toolService";
import type { Tool } from "../../../types/tool";
import { useNavigate } from "react-router";
import { ConfirmationModal } from "../../../components/ConfirmationModal";
import { toast } from "react-toastify";

const ToolList: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  const handleClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedToolId(null);
  };

  const handleDeleteTool = (toolId: string) => {
    setSelectedToolId(toolId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedToolId) {
      try {
        await ToolService.deleteTool(selectedToolId);
        setTools(tools.filter((tool) => tool.id !== selectedToolId));
        handleClose();
        toast.success("Ferramenta deletada com sucesso!");
      } catch (err) {
        setError("Failed to delete tool");
        console.error(err);
      }
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const data: { response: Tool[]; is_error: string } =
          await ToolService.getAllTools();
        setTools(data.response);
      } catch (err) {
        setError("Failed to fetch tools");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-950 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Ferramentas</h1>
          <button
            onClick={() => navigate("/create")}
            className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-all hover:bg-purple-700 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Nova Ferramenta
          </button>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-900 p-6">
            <div className="flex flex-col items-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-purple-500"></div>
              <p className="text-lg text-gray-300">Carregando ferramentas...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center rounded-lg bg-red-900/20 p-6">
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mb-4 h-12 w-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg text-red-200">Erro: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        ) : tools.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-gray-900 p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4 h-16 w-16 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p className="text-xl text-gray-400">
              Nenhuma ferramenta encontrada
            </p>
            <button
              onClick={() => navigate("/create")}
              className="mt-4 rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
            >
              Adicionar primeira ferramenta
            </button>
          </div>
        ) : (
          <div className="relative max-h-[85dvh] overflow-y-auto rounded-lg border border-gray-800 bg-gray-900 shadow-xl">
            <div>
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="sticky top-0">
                  <tr className="bg-gray-800">
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-300 uppercase">
                      Título
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-300 uppercase">
                      Descrição
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-300 uppercase">
                      Link
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-300 uppercase">
                      Tags
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-300 uppercase">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {tools.map((tool) => (
                    <tr
                      key={tool.id}
                      className="transition-colors hover:bg-gray-800/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-white">
                          {tool.title}
                        </div>
                      </td>
                      <td className="max-w-xs px-6 py-4">
                        <div className="overflow-hidden text-sm text-ellipsis text-gray-300">
                          {tool.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-400 hover:text-blue-300"
                        >
                          <span className="max-w-[200px] truncate">
                            {tool.link}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-1 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {tool.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex rounded-full bg-gray-700 px-2 py-1 text-xs font-medium text-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none">
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteTool(tool.id)}
                            className="rounded bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Excluir ferramenta"
        message="Tem certeza que deseja excluir essa ferramenta? Essa ação é irreversível."
        confirmText="Excluir"
      />
    </div>
  );
};

export default ToolList;
