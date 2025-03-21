import { useState } from 'react';
import { BsHash } from 'react-icons/bs';
import { FaChevronDown, FaChevronRight, FaPlus } from 'react-icons/fa';

const topics = ['Upload Reviews', 'Edit Categories and Keywords'];
// const questions = ['jit-compilation', 'purge-files', 'dark-mode'];
// const random = ['variants', 'plugins'];

const ChannelBar = () => {
  return (
    <div className='channel-bar shadow-lg'>
      {/* <ChannelBlock /> */}
      <div className='channel-container'>
        <Dropdown header='Sentiment Analysis' selections={topics} />
      </div>
    </div>
  );
};

const Dropdown = ({ header, selections }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className='dropdown'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          {header}
        </h5>
        <FaPlus size='12' className='text-accent text-opacity-80 my-auto ml-auto' />
      </div>
      {expanded &&
        selections &&
        selections.map((selection) => <TopicSelection selection={selection} />)}
    </div>
  );
};

const ChevronIcon = ({ expanded }) => {
  const chevClass = 'text-accent text-opacity-80 my-auto mr-1';
  return expanded ? (
    <FaChevronDown size='14' className={chevClass} />
  ) : (
    <FaChevronRight size='14' className={chevClass} />
  );
};

const TopicSelection = ({ selection }) => (
  <div className='dropdown-selection'>
    {/* <BsHash size='24' className='text-gray-400' /> */}
    <h6 className='dropdown-selection-text'>{selection}</h6>
  </div>
);

const ChannelBlock = () => (
  <div className='channel-block'>
    <h5 className='channel-block-text'>Home</h5>
  </div>
);

export default ChannelBar;
