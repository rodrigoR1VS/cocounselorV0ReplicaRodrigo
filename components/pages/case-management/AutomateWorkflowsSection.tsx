import { AUTOMATE_WORKFLOWS_CONTENT } from '@/constants/content';
import Image from 'next/image';

const AutomateWorkflowsSection = () => {
  return (
    <div className="py-16 flex flex-col md:flex-row relative h-[733px] md:h-auto">
      {/* Background Image - Mobile */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/CaseManagementBannerMobile.svg"
          alt="Case Management Banner Mobile Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Background Image - Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/CaseManagementBannerDesktop.svg"
          alt="Case Management Banner Desktop Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Section - Empty (First in mobile, Second in desktop) */}
      <div className="w-full md:w-1/2 relative z-10 md:order-2">
      </div>

      {/* Left Section - Text Content (Second in mobile, First in desktop) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-12 relative z-10 md:order-1">
        <div className="max-w-lg">
          {/* Title */}
          <h2 className="mb-6 leading-tight text-[32px] md:text-[42px] pt-[255px] md:pt-0">
            <span className="text-blue-400 font-bold">Automate workflows</span>
            <br />
            <span className="text-white">{AUTOMATE_WORKFLOWS_CONTENT.LEFT_SECTION.TITLE.WHITE_TEXT}</span>
          </h2>
          
          {/* Description */}
          <p className="text-white leading-relaxed" style={{fontSize: '14px'}}>
            {/* Mobile: no forced line breaks */}
            <span className="md:hidden">
              Our automated workflows and task management tools simplify your operations by reducing manual effort and standardizing procedures. With predefined templates and automatic task assignments, you'll minimize errors and accelerate case handling, allowing your team to focus on high-value work.
            </span>
            {/* Desktop: with forced line breaks */}
            <span className="hidden md:inline">
              Our automated workflows and task management tools simplify
              <br />
              your operations by reducing manual effort and standardizing
              <br />
              procedures. With predefined templates and automatic task
              <br />
              assignments, you'll minimize errors and accelerate case
              <br />
              handling, allowing your team to focus on high-value work.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutomateWorkflowsSection;
