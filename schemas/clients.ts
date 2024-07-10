import { z } from "zod";
import ValidateObjectId from "../helpers/validateObjectId";


const DOC_TYPES = [
    "RUC",
    "Cédula",
    "Pasaporte",
    "Identificación exterior"
] as const


export const ClientShema = z.object({
    firstname: z.string().min(3),
    lastname: z.string().min(3),
    email : z.string().email("El email no es valido."),
    document_type: z.enum(DOC_TYPES),
    document_value: z.string().min(4),
})

export const ClientCreationScema = z.object({
    body: ClientShema,
})

export const ClientEditionScema = z.object({
    body: ClientShema.partial(),
    params: z.object({
        id: z.custom(ValidateObjectId, "ID de cliente invalido!")
    })
})

export type Client = z.infer<typeof ClientShema> 