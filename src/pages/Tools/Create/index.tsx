import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ToolService } from "../../../services/toolService";
import { CreateToolData } from "../../../types/tool";
import { useNavigate } from "react-router";

const schema = z.object({
  name: z.string(),
  link: z.string(),
  description: z.string().min(10),
  tags: z.string(),
});

type FormFields = {
  name: string;
  link: string;
  description: string;
  tags: string;
};

const CreateTool: React.FC = () => {
  const navigate = useNavigate();
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
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex h-dvh w-full items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-[500px] flex-col gap-4"
        >
          <input
            {...register("name")}
            className="bg-[#101828] text-white placeholder:text-white/60"
            placeholder="Nome"
            type="text"
          />
          {errors.name && <span>{errors.name.message}</span>}

          <input
            {...register("link")}
            className="bg-[#101828]"
            placeholder="Link"
            type="text"
          />
          {errors.link && <span>{errors.link.message}</span>}

          <textarea
            {...register("description")}
            className="bg-[#101828]"
            placeholder="Descrição"
          />
          {errors.description && <span>{errors.description.message}</span>}

          <input
            {...register("tags")}
            className="bg-[#101828]"
            placeholder="Tags"
            type="text"
          />
          {errors.tags && <span>{errors.tags.message}</span>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-all hover:bg-purple-700 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
          >
            {isSubmitting ? "Criando ferramenta..." : "Criar ferramenta"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTool;
