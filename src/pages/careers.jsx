import React, { useEffect, useState } from 'react';
import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../landing/Footer';
import RadialBlur from '../landing/RadialBlur';
import LandingSection from '../landing/LandingSection';

// Cache expiration time in milliseconds (24 hours)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Check if we have cached data
        const cachedData = localStorage.getItem('windmill_jobs_cache');
        
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const currentTime = new Date().getTime();
          
          // Use cached data if it's still fresh (less than 24 hours old)
          if (currentTime - timestamp < CACHE_EXPIRATION) {
            setJobs(data);
            setLoading(false);
            return;
          }
        }
        
        // If no valid cache, fetch from API
        const response = await fetch('https://app.windmill.dev/api/w/windmill-labs/jobs/run_wait_result/p/f/all/job_offers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer arDPgCvSsZlp3oPKdaGXtKFYxEuNOgyq' // intentionally, harmless token
          },
          body: JSON.stringify({})
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Store in cache with current timestamp
        localStorage.setItem('windmill_jobs_cache', JSON.stringify({
          data,
          timestamp: new Date().getTime()
        }));
        
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        
        // Try to use cached data even if expired in case of error
        try {
          const cachedData = localStorage.getItem('windmill_jobs_cache');
          if (cachedData) {
            const { data } = JSON.parse(cachedData);
            setJobs(data);
          }
        } catch (cacheError) {
          console.error('Error retrieving cache:', cacheError);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
    
    // Clean up function to handle potential memory leaks
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  return (
    <LayoutProvider>
      <main>
        <Head>
          <title>Careers | Windmill</title>
          <meta name="title" content="Join the Windmill Team." />
          <meta name="description" content="Explore career opportunities at Windmill and join our team of experts." />
        </Head>
        <LandingHeader />
        <LandingSection bgClass="relative">
          <>
            <RadialBlur />
            <div className="space-y-12 text-center pt-32 pb-16">
              <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                <h1 className="!text-4xl font-bold tracking-tight sm:!text-5xl mb-8 text-blue-600">We are hiring</h1>
                <p className="text-lg">Help us build the next generation infra software.</p>
                <img src="/images/careers/team_sun.jpeg" alt="Team Sun" className="mx-auto mt-8 rounded-lg shadow-lg" />
              </div>
            </div>
          </>
        </LandingSection>
        <LandingSection bgClass="relative">
          <div className="space-y-8 pt-32 pb-16">
            <h2 className="!text-3xl font-bold tracking-tight sm:!text-4xl mb-10 text-center">Back to the essence of code</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto px-6 sm:px-10 lg:px-12">
              <div className="space-y-5">
                <p className="text-md">
                  At Windmill, we believe code falls into two categories: code that matters (your business logic) and boilerplate (everything else). Most platforms attempt to solve this by abstracting away code entirely, sacrificing flexibility and power.
                </p>
                <p className="text-md">
                  Our mission is to eliminate the boilerplate while preserving the full power of code. We've built an open-source developer platform that turns scripts in multiple languages into endpoints, workflows, and UIs without the traditional overhead.
                </p>
              </div>
              <div className="space-y-5">
                <p className="text-md">
                  We're creating infrastructure that delivers the best of both worlds: accessible to semi-technical users without compromising on the flexibility and control senior engineers demand. Our platform handles the undifferentiated heavy lifting—permissions, scheduling, secret management, deployment—so you can focus on what matters.
                </p>
                <p className="text-md">
                  If you believe infrastructure should get out of your way, that good tooling should amplify rather than constrain engineers, and that powerful systems can also be accessible, we want you on our team.
                </p>
              </div>
            </div>
          </div>
        </LandingSection>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="space-y-10">
            {jobs.some(job => job.title) && (
              <>
                <div className="text-center">
                  <h2 className="!text-3xl font-bold tracking-tight sm:!text-4xl mb-8">Open roles</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                  {jobs.map((job, index) => (
                    job.title && (
                      <a 
                        key={index} 
                        href={job.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow block flex flex-col h-full"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold text-blue-600 mb-2">{job.title}</h3>
                          <div className="space-y-3 mb-4">
                            <p><span className="font-medium">Location:</span> {job.location}</p>
                            <p><span className="font-medium">Compensation:</span> {job.wage}</p>
                            <p><span className="font-medium">Equity:</span> {job.equity}</p>
                          </div>
                        </div>
                        <div className="mt-auto pt-4">
                          <span 
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                            onClick={(e) => {
                              // Prevent duplicate navigation
                              e.preventDefault();
                              window.open(job.url, '_blank', 'noopener,noreferrer');
                            }}
                          >
                            Apply
                          </span>
                        </div>
                      </a>
                    )
                  ))}
                </div>
                <div className="text-center mt-12">
                  <p className="text-lg">Don't see a perfect fit? We're always looking for talented individuals.</p>
                </div>
              </>
            )}
            {!jobs.some(job => job.title) && (
              <div className="text-center mt-12">
                <p className="text-lg">We're always looking for talented individuals.</p>
              </div>
            )}
            <div className="text-center mt-4">
              <a 
                href="mailto:jobs@windmill.dev" 
                className="inline-block bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium py-2 px-6 rounded-md transition-colors"
              >
                Send general application
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </LayoutProvider>
  );
}