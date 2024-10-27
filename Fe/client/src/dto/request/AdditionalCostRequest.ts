import { z } from "zod";

export const additionalCostCreationRequest = z.object(
	{
		name: z.string().min(3, "tên phải lớn hơn 3 kí tự").max(255,"tên phải nhỏ hơn 255 kí tự"),
		cost: z.number().min(0,"giá phải lớn hơn 0"),
		unit: z.string().min(3,"tên đơn vị pahir lớn hơn 3").max(255,"tên đơn vị phải nhỏ hơn 255"),
		additionalCostType: z.string()
	}
).strict();

export const additionalCostUpdateRequest = z.object(
	{
		name: z.string().min(3, "tên phải lớn hơn 3 kí tự").max(255,"tên phải nhỏ hơn 255 kí tự"),
		cost: z.number().min(0,"giá phải lớn hơn 0"),
		unit: z.string().min(3,"tên đơn vị pahir lớn hơn 3").max(255,"tên đơn vị phải nhỏ hơn 255"),
		additionalCostType: z.string()
	}
).strict();

