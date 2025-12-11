import React, { useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { useColorMode } from '@docusaurus/theme-common';
import TaskDurationBarChart from '../components/TaskDurationBarChart';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { BenchmarkVisualization } from '../components/BenchmarkVisualization';

export default function FlowChart() {
	const [chart, setChart] = React.useState<'short' | 'long'>(undefined);

	useEffect(() => {
		setChart('short');
	}, []);

	const { colorMode } = useColorMode();

	return (
		<div className="flex flex-col w-full gap-4 justify-center items-start">
			<div className="flex flex-col gap-2 w-full">
				<div className="my-2 sm:my-4 flex flex-row gap-2 items-center transition-all flex-wrap">
					<span className={classNames('font-light text-xs sm:text-sm text-gray-900 dark:text-white whitespace-nowrap')}>
						10 long running tasks
					</span>
					<Switch
						checked={chart === 'short'}
						title="Switch between short and long running tasks"
						onChange={() => {
							setChart(chart === 'long' ? 'short' : 'long');
						}}
						className={`${
							chart === 'short'
								? 'bg-emerald-500 dark:bg-emerald-900'
								: 'bg-gray-200 dark:bg-gray-800'
						}
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
					>
						<span
							aria-hidden="true"
							className={`${chart === 'short' ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white  shadow-lg ring-0 transition duration-200 ease-in-out`}
						/>
					</Switch>
					<span className={classNames('font-light text-xs sm:text-sm text-gray-900 dark:text-white whitespace-nowrap')}>
						40 lightweight tasks
					</span>
				</div>
			</div>
			<div
				className={classNames(
					colorMode === 'dark' ? 'bg-black' : 'bg-gray-50',
					'w-full p-2 sm:p-4 md:p-8 bg-opacity-40 rounded-xl overflow-x-auto'
				)}
			>
				<div className="grid w-full min-w-0">
					{chart === 'short' ? (
						<div className="w-full min-w-0 overflow-x-auto" key="short-tasks">
							<div className="min-w-[600px] sm:min-w-0">
								<BenchmarkVisualization
									usecase="fibonacci_40_10"
									language="python"
									engines={[
										'airflow',
										'kestra',
										'prefect',
										'temporal',
										'windmill',
										'windmill_dedicated'
									]}
									workers={1}
									title="40 lightweight tasks comparison (animation time speed 20x)"
									maintainAspectRatio={false}
									shouldAnimate={true}
								/>
							</div>
						</div>
					) : (
						<div className="w-full min-w-0 overflow-x-auto" key="long-tasks">
							<div className="min-w-[600px] sm:min-w-0">
								<BenchmarkVisualization
									usecase="fibonacci_10_33"
									language="python"
									engines={[
										'airflow',
										'kestra',
										'prefect',
										'temporal',
										'windmill',
										'windmill_dedicated',
									]}
									workers={1}
									title="10 long running tasks comparison (animation time speed 20x)"
									maintainAspectRatio={false}
									shouldAnimate={true}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
			<div>
				<a
					type="button"
					target="_blank"
					href="/docs/misc/benchmarks/competitors"
					className={`text-sm flex flex-row items-center gap-2 text-emerald-500 !no-underline hover:text-emerald-700`}
				>
					See all benchmarks
					<BookOpen className=" h-4" />
				</a>
			</div>
		</div>
	);
}
