import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import MapComponent from "./MapComponent";

const PropertyDetails = ({ description, floorPlan, location }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabSelect = (index) => {
    setSelectedTabIndex(index);
  };

  // Style tabs based on selection
  const tabStyle = (index) => {
    // Selected style
    if (index === selectedTabIndex) {
      return {
        backgroundColor: '#007bff', 
        color: '#fff', 
        padding: '6px 12px',
        cursor: 'pointer',
        borderBottom: 'none',
        borderTopLeftRadius: '0',
        borderTopRightRadius: '0',
      };
    }
    // Non-selected style
    return {
      backgroundColor: '#343a40', 
      color: '#ffffff',
      padding: '6px 12px',
      cursor: 'pointer',
      borderBottom: 'none',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
    };
  };

  return (
    <div className="w-66 bg-light my-5">
      <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabSelect} className="pb-5">
        {/* Tab header */}
        <TabList className="d-flex text-center list-unstyled bg-light">
          <Tab className="w-33 p-3" style={tabStyle(0)}>Description</Tab>
          <Tab className="w-33 p-3" style={tabStyle(1)}>Floor Plan</Tab>
          <Tab className="w-33 p-3" style={tabStyle(2)}>Map</Tab>
        </TabList>
        {/* Description tab */}
        <TabPanel className="bg-light px-5">
          <p className="pt-4">{description}</p>
        </TabPanel>
        {/* Floorplan tab */}
        <TabPanel className="bg-light px-5">
          {floorPlan ? (
            <img src={floorPlan} className="img-fluid  pt-4" alt="Floor Plan" />
          ) : (
            <p>No floor plan available</p>
          )}
        </TabPanel>
        {/* Map tab */}
        <TabPanel className="bg-light px-5 d-flex justify-content-center mt-5">
          {location ? (
            <MapComponent location={location} />
          ) : (
            <p>No Google map available</p>
            
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
