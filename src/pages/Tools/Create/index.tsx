import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { unknown, z } from "zod";
import { ToolService } from "../../../services/toolService";
import { CreateToolData } from "../../../types/tool";
import { useNavigate } from "react-router";
import { Input } from "../../../components/Form/Input";
import { useErrorStore } from "../../../stores/errorStore";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  link: z
    .string()
    .min(1, "Link é obrigatório")
    .url("Por favor, insira uma URL válida (ex: https://exemplo.com)"),
  description: z
    .string()
    .min(10, "A descrição da ferramenta deve ter pelo menos 10 caracteres")
    .nonempty("A descrição da ferramenta é obrigatória"),
  tags: z.string().min(1, "A tag da ferramenta é obrigatórias"),
});

type FormFields = {
  name: string;
  link: string;
  description: string;
  tags: string;
};

const CreateTool: React.FC = () => {
  const navigate = useNavigate();
  const showError = useErrorStore((state) => state.showError);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const createToolData: CreateToolData = {
      title: data.name,
      link: data.link,
      description: data.description,
      tags: [data.tags],
    };

    try {
      const response = await ToolService.createTool(createToolData);
      console.log(response);
      navigate("/");
    } catch (err) {
      if (err.response.data.is_error) {
        showError(err.response.data.message);
      } else {
        showError("Erro no servidor, tente novamente mais tarde.");
      }
    }
  };

  return (
    <>
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 px-4">
        <h1>
          <span className="text-2xl font-bold text-white md:text-3xl">
            Cadastro de ferramenta
          </span>
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6 md:w-[500px]"
        >
          <Input
            register={register}
            name="name"
            label="Nome"
            placeholder="Digite o nome da ferramenta"
            error={errors.name}
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
    </>
  );
};

export default CreateTool;
