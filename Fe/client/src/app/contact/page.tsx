import React from "react";
import ContactForm from "./contactForm";
import { UserIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/16/solid"; // Hoặc '@heroicons/react/outline'

export default function Page() {
	return (
		<div className="max-w-ct-max-width my-[32px] w-full mx-auto">
			{/* <Sectionhead>
				<Fragment slot="title">Contact</Fragment>
				<Fragment slot="desc">We are a here to help.</Fragment>
			</Sectionhead> */}

			<div className="grid md:grid-cols-2 gap-10 mx-auto max-w-4xl mt-16">
				<div>
					<h2 className="font-medium text-2xl text-gray-800">
						Contact Astroship
					</h2>
					<p className="text-lg leading-relaxed text-slate-500 mt-3">
						Have something to say? We are here to help. Fill up the
						form or send email or call phone.
					</p>
					<div className="mt-5">
						<div className="flex items-center mt-2 space-x-2 text-gray-600">
							<MapPinIcon className="text-gray-400 w-5 h-5" />
							<span>1734 Sanfransico, CA 93063</span>
						</div>
						<div className="flex items-center mt-2 space-x-2 text-gray-600">
							<UserIcon className="text-gray-400 w-5 h-5" />

							<a href="mailto:hello@astroshipstarter.com">
								hello@astroshipstarter.com
							</a>
						</div>
						<div className="flex items-center mt-2 space-x-2 text-gray-600">
							<PhoneIcon className="text-gray-400 w-5 h-5" />
							<a href="tel:+1 (987) 4587 899">
								+1 (987) 4587 899
							</a>
						</div>
					</div>
				</div>
				<div>
					<ContactForm />
				</div>
			</div>
		</div>
	);
}
