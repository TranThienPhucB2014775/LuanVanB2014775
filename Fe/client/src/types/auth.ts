import { registerRequest } from "@/dto/request/registerRequest";
import { z } from "zod";

export type RegisterResType = z.TypeOf<typeof registerRequest>;
