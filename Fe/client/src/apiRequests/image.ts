import { http } from "@/lib";
import { verificationResponse } from "@/dto/response/verification";
import { result } from "@/dto/result";

const ImageRentalPostApiRequest = {
		updateImageRentalPost: (
			data: {
				imageId: string,
				formData: FormData,
				sessionToken: string
			}) => http.put<result<string>>(
			`/post/image/${data.imageId}`,
			data.formData,
			{
				headers: {
					Authorization: `Bearer ${data.sessionToken}`
				}
			}
		),
		createImageRentalPost: (data: { formData: FormData; sessionToken: string }) => {
			return http.post<result<string>>(
				`/post/image`,
				data.formData,
				{
					headers: {
						Authorization: `Bearer ${data.sessionToken}`
					}
				}
			);
		},
		deleteImageRentalPost: (
			data: {
				imageId: string,
				sessionToken: string
			}
		) => http.delete<result<string>>(
			`/post/image/${data.imageId}`,
			{
				headers: {
					Authorization: `Bearer ${data.sessionToken}`
				}
			}
		)
	}
;

export default ImageRentalPostApiRequest;