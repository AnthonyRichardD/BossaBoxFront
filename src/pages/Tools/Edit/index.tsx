// pages/Tools/Edit/index.tsx
import { useParams, useNavigate } from "react-router";
import { useUpdateToolStore } from "../../../stores/updateToolStore";
import { ToolService } from "../../../services/toolService";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../../components/Form/Input";
import { Tool } from "../../../types/tool";

const schema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  link: z.string().url("URL inválida").min(1, "Link é obrigatório"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres"),
  tags: z.string().min(1, "Pelo menos uma tag é obrigatória"),
});

const EditTool: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toolData, setTool } = useUpdateToolStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Tool>({
    resolver: zodResolver(schema),
    defaultValues: toolData,
  });

  const onSubmit = async (data: Tool) => {
    try {
      await ToolService.updateTool(id!, {
        ...data,
        tags: data.tags.split(",").map((tag: string) => tag.trim()),
      });
      toast.success("Ferramenta atualizada com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao atualizar ferramenta");
    }
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[500px] flex-col gap-4"
      >
        <Input
          register={register}
          name="title"
          label="Nome"
          placeholder="Digite o nome da ferramenta"
          error={errors.title}
        />

        <Input
          register={register}
          name="link"
          label="Link"
          placeholder="https://exemplo.com"
          error={errors.link}
        />

        <Input
          label="Descrição"
          register={register}
          name="description"
          placeholder="Descreva a ferramenta"
          error={errors.description}
          as="textarea"
          className="h-40 resize-none"
        />

        <Input
          label="Tag"
          register={register}
          name="tags"
          placeholder="Tag"
          error={errors.tags}
        />

        <div className="flex items-center justify-between">
          <button
            className="mt-2 cursor-pointer rounded-lg border border-gray-600 px-4 py-2 text-lg font-medium text-white transition-all hover:border-blue-500 hover:text-blue-500 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
            type="button"
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 cursor-pointer rounded-lg bg-purple-600 px-4 py-2 text-lg font-medium text-white transition-all hover:bg-purple-700 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
          >
            {isSubmitting
              ? "Cadastrando ferramenta..."
              : "Cadastrar Ferramenta"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTool;
