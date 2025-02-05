import React from 'react';
import LandingSection from './LandingSection';
import CardSection from './cards-v2/CardSection';
import {
	Code,
	Hand,
	Palette,
	LucideIcon,
	ArrowRight,
	Monitor,
	AlertTriangle,
	AtSignIcon,
	BarChart4,
	Binary,
	BoxSelect,
	Calendar,
	CalendarClock,
	Clock,
	Code2,
	Database,
	DollarSign,
	Download,
	FileBarChart,
	FileText,
	FlipHorizontal,
	FlipVertical,
	FormInput,
	GripHorizontal,
	Heading1,
	Inspect,
	List,
	ListIcon,
	ListOrdered,
	MapPin,
	Menu,
	Network,
	Paperclip,
	PieChart,
	PlusSquare,
	SeparatorHorizontal,
	SeparatorVertical,
	SidebarClose,
	SlidersHorizontal,
	Smile,
	Split,
	Table2,
	TextCursorInput,
	ToggleLeft,
	Type,
	UploadCloud,
	Lock,
	Image,
	Puzzle,
	GalleryThumbnails,
	ListCollapse
} from 'lucide-react';

import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

function DragAndDropAnimation() {
	return (
		<div className="relative w-full bg-orange-900 rounded-lg p-6 h-80">
			<div className="border-orange-600 border-2 relative rounded-lg p-4 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] overflow-hidden">
				<motion.div
					initial="first"
					animate={{
						top: [100, 100, 0, 100],
						left: [8, 8, 100, 8]
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						repeatType: 'loop',
						ease: 'easeInOut'
					}}
					style={{ position: 'absolute', zIndex: 999 }}
				>
					<div className="h-full w-[120px] p-2">
						<div className="bg-blue-500 p-2 text-white text-md rounded-md flex justify-center">
							Load data
						</div>
					</div>
				</motion.div>
				<motion.div
					initial="first"
					animate={{
						top: [150, 150, 50, 150],
						left: [118, 118, 210, 118]
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						repeatType: 'loop',
						ease: 'easeInOut'
					}}
					style={{ position: 'absolute', zIndex: 999 }}
				>
					<div className="bg-white">
						<Hand className="text-gray-900 dark:white" />
					</div>
				</motion.div>
				<div className="absolute top-40">
					<div className="divide-y flex flex-col border rounded-md overflow-hidden text-gray-900">
						<div className="divide-x flex flex-row">
							<div className="py-1 px-2 bg-gray-50 w-40">Product Name</div>
							<div className="py-1 px-2 bg-gray-50 w-24">Price</div>
							<div className="py-1 px-2 bg-gray-50 w-40">Tags</div>
						</div>
						<div className="divide-x flex flex-row ">
							<div className="py-1 px-2 w-40">iPhone 15</div>
							<div className="py-1 px-2 w-24">1299</div>
							<div className="py-1 px-2 w-40">
								<div className="bg-green-100 text-green-800 px-2 rounded-md w-min">Apple</div>
							</div>
						</div>
						<div className="divide-x flex flex-row ">
							<div className="py-1 px-2 w-40">Galaxy S24</div>
							<div className="py-1 px-2 w-24">1429</div>
							<div className="py-1 px-2 w-40">
								<div className="bg-blue-100 text-blue-800 px-2 rounded-md w-min">Samsung</div>
							</div>
						</div>
						<div className="divide-x flex flex-row ">
							<div className="py-1 px-2 w-40">iPhone 15</div>
							<div className="py-1 px-2 w-24">1299</div>
							<div className="py-1 px-2 w-40">
								<div className="bg-red-100 text-red-800 px-2 rounded-md w-min">Apple</div>
							</div>
						</div>
					</div>
				</div>
				<div className="absolute top-8 left-64 w-44 h-28 border rounded-md overflow-hidden ">
					<div className="relative flex justify-center items-center p-2">
						<div className="h-full border-b w-full">
							<div className="flex flex-row justify-center gap-4 items-end px-2">
								<div className="bg-blue-200 h-16 w-12"></div>
								<div className="bg-red-200 h-24 w-12"></div>
								<div className="bg-yellow-200 h-12 w-12"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const features = [
	{
		title: 'Drag and Drop Interface',
		description:
			'Easily assemble apps with a user-friendly drag and drop interface, streamlining app development without deep coding. ',
		Icon: Hand,
		Component: DragAndDropAnimation,
		url: '/docs/apps/app_configuration_settings/app_component_library'
	},
	{
		title: 'Styling and Theming',
		description:
			'Style components and define global themes with CSS or Tailwind, ensuring cohesive and brand-aligned designs effortlessly.',
		Icon: Palette,
		defaultImage: '/illustrations/13.png',
		vertical: true,
		url: '/docs/apps/app_configuration_settings/app_styling'
	},
	{
		title: 'Developer Friendly',
		description:
			'Run scripts in Python, Go, PHP, Rust, Bash, C#, SQL, and TypeScript directly within the app editor.',
		Icon: Code,
		defaultImage: '/illustrations/14.png',
		url: '/docs/apps/app-runnable-panel',
		vertical: true
	}
] as {
	title: string;
	description: string;
	images: string[];
	span: string;
	height: number;
	noAnimation?: boolean;
	lottieData?: unknown;
	Icon: LucideIcon;
	vertical?: boolean;
	defaultImage: string;
	url: string;
}[];

const colors = {
	titleColor: 'text-orange-900 dark:text-orange-300',
	textColor: 'text-gray-600 dark:text-gray-100',
	linkColor: 'text-orange-500 dark:text-orange-300'
};

const documentationBaseUrl = 'https://www.windmill.dev/docs/apps/app_configuration_settings';

export const components = [
	{
		name: 'Rich Result',
		Icon: Monitor,
		documentationLink: `${documentationBaseUrl}/rich_result`
	},
	{
		name: 'Log by Job Id',
		Icon: Monitor,
		documentationLink: `${documentationBaseUrl}/log_display`
	},

	{
		name: 'Log',
		Icon: Monitor,
		documentationLink: `${documentationBaseUrl}/log_display`
	},
	{
		name: 'Flow Status',
		Icon: Monitor,
		documentationLink: `${documentationBaseUrl}/flow_status`
	},

	{
		name: 'Flow Status by Job Id',
		Icon: Monitor,
		documentationLink: `${documentationBaseUrl}/flow_status`
	},
	{ name: 'Container', Icon: BoxSelect, documentationLink: `${documentationBaseUrl}/container` },
	{
		name: 'List',
		Icon: ListIcon,
		documentationLink: `${documentationBaseUrl}/list`
	},

	{
		name: 'Text',
		Icon: Type,
		documentationLink: `${documentationBaseUrl}/text`
	},

	{
		name: 'Button',
		Icon: Inspect,
		documentationLink: `${documentationBaseUrl}/button`
	},

	{
		name: 'Download Button',
		Icon: Download,
		documentationLink: `${documentationBaseUrl}/download_button`
	},

	{
		name: 'Submit Form',
		Icon: FormInput,
		documentationLink: `${documentationBaseUrl}/submit_form`
	},
	{
		name: 'Modal Form',
		Icon: PlusSquare,
		documentationLink: `${documentationBaseUrl}/modal_form`
	},

	{ name: 'ChartJs', Icon: PieChart, documentationLink: `${documentationBaseUrl}/chartjs` },

	{
		name: 'AgCharts',
		Icon: BarChart4,
		documentationLink: `${documentationBaseUrl}/agcharts`
	},
	{
		name: 'HTML',
		Icon: Code2,
		documentationLink: `${documentationBaseUrl}/html`
	},

	{
		name: 'Custom',
		Icon: Code2,
		documentationLink: `https://www.windmill.dev/docs/apps/react_components`
	},

	{
		name: 'Markdown',
		Icon: Heading1,
		documentationLink: `${documentationBaseUrl}/html`
	},

	{
		name: 'Vega Lite',
		Icon: PieChart,
		documentationLink: `${documentationBaseUrl}/vega_lite`
	},

	{
		name: 'Plotly',
		Icon: PieChart,
		documentationLink: `${documentationBaseUrl}/plotly`
	},

	{
		name: 'Table',
		Icon: Table2,
		documentationLink: `${documentationBaseUrl}/table`
	},

	{
		name: 'Toggle',
		Icon: ToggleLeft,
		documentationLink: `${documentationBaseUrl}/toggle`
	},

	{
		name: 'Text Input',
		Icon: TextCursorInput,
		documentationLink: `${documentationBaseUrl}/text_input`
	},

	{
		name: 'Rich Text Editor',
		Icon: TextCursorInput,
		documentationLink: `${documentationBaseUrl}/rich_text_editor`
	},
	{
		name: 'Textarea',
		Icon: TextCursorInput,
		documentationLink: `${documentationBaseUrl}/textarea`
	},

	{
		name: 'Select',
		Icon: List,
		documentationLink: `${documentationBaseUrl}/select`
	},

	{
		name: 'Multi Select',
		Icon: List,
		documentationLink: `${documentationBaseUrl}/multiselect`
	},

	{
		name: 'Resource Select',
		Icon: List,
		documentationLink: `${documentationBaseUrl}/resource_select`
	},

	{
		name: 'Number',
		Icon: Binary,
		documentationLink: `${documentationBaseUrl}/number_input`
	},

	{
		name: 'Currency',
		Icon: DollarSign,
		documentationLink: `${documentationBaseUrl}/currency_input`
	},

	{
		name: 'Slider',
		Icon: SlidersHorizontal,
		documentationLink: `${documentationBaseUrl}/slider`
	},

	{
		name: 'Date Slider',
		Icon: SlidersHorizontal,
		documentationLink: `${documentationBaseUrl}/date_slider`
	},

	{
		name: 'Range',
		Icon: SlidersHorizontal,
		documentationLink: `${documentationBaseUrl}/range`
	},

	{
		name: 'Password',
		Icon: Lock,
		documentationLink: `${documentationBaseUrl}/password_input`
	},

	{
		name: 'Email Input',
		Icon: AtSignIcon,
		documentationLink: `${documentationBaseUrl}/email_input`
	},

	{
		name: 'Date',
		Icon: Calendar,
		documentationLink: `${documentationBaseUrl}/date_input`
	},

	{
		name: 'Date & Time',
		Icon: CalendarClock,
		documentationLink: `${documentationBaseUrl}/datetime_input`
	},

	{
		name: 'Time',
		Icon: Clock,
		documentationLink: `${documentationBaseUrl}/time_input`
	},

	{
		name: 'Tabs',
		Icon: ListOrdered,
		documentationLink: `${documentationBaseUrl}/tabs`
	},

	{
		name: 'Stepper',
		Icon: ListOrdered,
		documentationLink: `${documentationBaseUrl}/stepper`
	},

	{
		name: 'Carousel List',
		Icon: GalleryThumbnails,
		documentationLink: `${documentationBaseUrl}/carousel`
	},

	{
		name: 'Accordion List',
		Icon: ListCollapse,
		documentationLink: `${documentationBaseUrl}/accordion`
	},

	{
		name: 'Icon',
		Icon: Smile,
		documentationLink: `${documentationBaseUrl}/icon`
	},

	{
		name: 'Divider X',
		Icon: SeparatorHorizontal,
		documentationLink: `${documentationBaseUrl}/divider_x`
	},

	{
		name: 'Divider Y',
		Icon: SeparatorVertical,
		documentationLink: `${documentationBaseUrl}/divider_y`
	},

	{
		name: 'File Input',
		Icon: Paperclip,
		documentationLink: `${documentationBaseUrl}/file_input`
	},

	{
		name: 'Image',
		Icon: Image,
		documentationLink: `${documentationBaseUrl}/image`
	},

	{
		name: 'Drawer',
		Icon: SidebarClose,
		documentationLink: `${documentationBaseUrl}/drawer`
	},

	{
		name: 'Map',
		Icon: MapPin,
		documentationLink: `${documentationBaseUrl}/map`
	},

	{
		name: 'Vertical Split Panes',
		Icon: FlipHorizontal,
		documentationLink: `${documentationBaseUrl}/vertical_split_panes`
	},

	{
		name: 'Horizontal Split Panes',
		Icon: FlipVertical,
		documentationLink: `${documentationBaseUrl}/horizontal_split_panes`
	},

	{
		name: 'PDF',
		Icon: FileText,
		documentationLink: `${documentationBaseUrl}/pdf`
	},

	{
		name: 'Modal',
		Icon: SidebarClose,
		documentationLink: `${documentationBaseUrl}/modal`
	},

	{
		name: 'Form',
		Icon: FileText,
		documentationLink: `${documentationBaseUrl}/form_input`
	},

	{
		name: 'Select Tab',
		Icon: List,
		documentationLink: `${documentationBaseUrl}/select_tab`
	},

	{
		name: 'Select Step',
		Icon: List,
		documentationLink: `${documentationBaseUrl}/select_step`
	},

	{
		name: 'Conditional Tabs',
		Icon: Split,
		documentationLink: `${documentationBaseUrl}/conditional_tabs`
	},

	{
		name: 'Statistic Card',
		Icon: FileBarChart,
		documentationLink: `${documentationBaseUrl}/statistic_card`
	},

	{
		name: 'Dropdown Menu',
		Icon: Menu,
		documentationLink: `${documentationBaseUrl}/dropdown_menu`
	},

	{
		name: 'Decision Tree',
		Icon: Network,
		documentationLink: `${documentationBaseUrl}/decision_tree`
	},

	{
		name: 'S3 File Uploader',
		Icon: UploadCloud,
		documentationLink: `${documentationBaseUrl}/s3fileinput`
	},

	{
		name: 'Database Studio Table',
		Icon: Database,
		documentationLink: `${documentationBaseUrl}/database_studio`
	},
	{
		name: 'Alert',
		Icon: AlertTriangle,
		documentationLink: `${documentationBaseUrl}/alert`
	}
];

export default function AppsLightSections() {
	return (
		<LandingSection bgClass="">
			<div className="!flex !flex-col gap-8">
				<CardSection
					colors={colors}
					title="Build fast apps using drag-and-drop"
					description="Create apps with a user-friendly drag-and-drop interface, streamlining app development without deep coding."
					features={features}
					defaultImage="/illustrations/fond-apps.png"
				/>
				<a
					className={twMerge(
						`text-black dark:text-white !no-underline hover:text-black hover:dark:text-white bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden col-span-12 group cursor-pointer p-8 relative grid gap-4 hover:bg-opacity-50 transition-all group `
					)}
					href={'/docs/apps/app_configuration_settings/app_component_library'}
					target="_blank"
				>
					<div className="group-hover:ml-2 transition-all">
						<div className="font-normal text-xl mb-6 flex flex-row items-center ">
							<Puzzle size={20} className="mr-2" />
							{'60+ built-in components'}
						</div>
						<div className="text-md mb-4  max-w-lg">
							{
								'Use over 60 built-in components for fast and efficient app development, covering a wide range of functionalities.'
							}
						</div>

						<div className={`text-sm ${colors.linkColor} flex flex-row items-center gap-2  `}>
							Learn more
							<ArrowRight size={24} />
						</div>
					</div>

					<div className="col-span-2">
						<div className="relative w-full bg-orange-900 rounded-lg p-6 h-96">
							<div className="border-orange-600 border-2 relative rounded-lg p-4 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] overflow-hidden overflow-y-scroll">
								<div className="grid grid-cols-2 md:grid-cols-8 gap-4">
									{components.map((item, index) => (
										<a
											href={item.documentationLink}
											className="col-span-1  h-28 rounded-md border flex justify-center items-center gap-2 flex-col bg-white hover:bg-gray-50 !text-gray-900"
										>
											<item.Icon size={32} />
											<div className="text-xs text-center">{item.name}</div>
										</a>
									))}
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>
		</LandingSection>
	);
}
