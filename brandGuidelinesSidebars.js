/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
	tutorialSidebar: [
		{
			type: 'doc',
			id: 'index',
			label: 'Overview'
		},
		{
			type: 'category',
			label: 'Brand Foundation',
			items: [
				{
					type: 'doc',
					id: 'brand_foundation/dna_mission/index',
					label: 'DNA & Mission'
				},
				{
					type: 'doc',
					id: 'brand_foundation/buyer_persona/index',
					label: 'Buyer Persona'
				}
			]
		},
		{
			type: 'category',
			label: 'Voice & Communication',
			items: [
				{
					type: 'doc',
					id: 'voice_communication/tone_of_voice/index',
					label: 'Tone of Voice'
				}
			]
		},
		{
			type: 'category',
			label: 'Visual Identity',
			items: [
				{
					type: 'doc',
					id: 'visual_identity/logo/index',
					label: 'Logo'
				},
				{
					type: 'doc',
					id: 'visual_identity/color_system/index',
					label: 'Color System'
				},
				{
					type: 'doc',
					id: 'visual_identity/typography/index',
					label: 'Typography'
				},
				{
					type: 'doc',
					id: 'visual_identity/elevation/index',
					label: 'Elevation'
				}
			]
		},
		{
			type: 'category',
			label: 'Design System',
			items: [
				{
					type: 'doc',
					id: 'design_system/iconography/index',
					label: 'Iconography'
				},
				{
					type: 'doc',
					id: 'design_system/spacing_grid/index',
					label: 'Spacing & Grid'
				},
				{
					type: 'doc',
					id: 'design_system/components/index',
					label: 'Components'
				},
				{
					type: 'doc',
					id: 'design_system/layout/index',
					label: 'Layout'
				},
				{
					type: 'doc',
					id: 'design_system/interaction_behavior/index',
					label: 'Interaction & Behavior'
				}
			]
		}
	]
};

module.exports = sidebars;
