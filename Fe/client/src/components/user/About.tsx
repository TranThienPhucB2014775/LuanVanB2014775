import React from "react";
import { infoResponse } from "@/dto/response";

function About({ user }: { user: infoResponse | undefined }) {
	return (
		<div className="grid gap-6 pr-80">
			<div>
				<h3 className="text-lg font-semibold">Giới thiệu</h3>
				<p className="text-muted-foreground">
					{user?.result.aboutMe}
				</p>
			</div>
			<div>
				<h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<div className="text-muted-foreground">Địa chỉ</div>
						<div>New York, USA</div>
					</div>
					<div>
						<div className="text-muted-foreground">Ngày tạo</div>
						<div>{user?.result.createdDate.toString()}</div>
					</div>
					<div>
						<div className="text-muted-foreground">Email</div>
						<div>{user?.result.email}</div>
					</div>
					<div>
						<div className="text-muted-foreground">Phone</div>
						<div>{user?.result.phoneNumber}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;