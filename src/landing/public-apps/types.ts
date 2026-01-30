export interface FileTreeItem {
	name: string;
	type: 'file' | 'folder';
	children?: FileTreeItem[];
}

export interface FlowStep {
	id: string;
	label: string;
	type: 'input' | 'script' | 'ai' | 'return' | 'output';
	tag?: string;
	parallel?: FlowStep[];
}

export interface PublicAppCodeData {
	fileTree: FileTreeItem[];
	fileContents: Record<string, string>;
	flowData?: Record<string, FlowStep[]>;
	flowDescriptions?: Record<string, string[]>;
}
