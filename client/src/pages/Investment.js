import React from 'react';
import './InvestmentAreas.css'; // Import the CSS for styling

const InvestmentAreas = () => {
  // List of investment areas, descriptions, and expected return rates
  const investmentAreas = [
    { title: 'Renewable Energy', description: 'High demand, government incentives, and long-term growth potential.', returnRate: '+15%' },
    { title: 'Artificial Intelligence (AI)', description: 'Revolutionizing industries, driving innovation, and offering significant returns.', returnRate: '+25%' },
    { title: 'E-commerce', description: 'Expanding market, increasing online sales, and diverse investment opportunities.', returnRate: '+20%' },
    { title: 'Healthcare', description: 'Aging population, advancements in medicine, and consistent demand for healthcare services.', returnRate: '+18%' },
    { title: 'Cybersecurity', description: 'Growing threat landscape, increasing demand for security solutions, and strong growth potential.', returnRate: '+22%' },
    { title: 'FinTech', description: 'Disrupting traditional finance, offering innovative solutions, and attracting significant investment.', returnRate: '+24%' },
    { title: 'Cloud Computing', description: 'High demand for data storage and processing, growing market share, and strong profitability.', returnRate: '+21%' },
    { title: 'Biotechnology', description: 'Medical breakthroughs, developing new treatments, and high-growth potential.', returnRate: '+23%' },
    { title: 'Electric Vehicles (EVs)', description: 'Increasing demand, government support, and potential for significant market disruption.', returnRate: '+19%' },
    { title: 'Gaming', description: 'Growing industry, expanding market, and potential for high returns through esports and gaming technology.', returnRate: '+20%' },
    { title: 'Real Estate', description: 'Tangible asset, potential for rental income and appreciation, and diverse investment options.', returnRate: '+12%' },
    { title: 'Education Technology (EdTech)', description: 'Growing demand for online learning, innovative solutions, and high-growth potential.', returnRate: '+18%' },
    { title: 'Travel and Tourism', description: 'Rebound post-pandemic, increasing demand for experiences, and diverse investment opportunities.', returnRate: '+16%' },
    { title: 'Luxury Goods', description: 'Growing global wealth, increasing demand for high-end products, and potential for strong returns.', returnRate: '+14%' },
    { title: 'Agriculture Technology (AgTech)', description: 'Improving food production, increasing efficiency, and addressing global food security challenges.', returnRate: '+17%' },
    { title: 'Logistics and Supply Chain', description: 'Essential for global trade, increasing demand for efficient solutions, and strong growth potential.', returnRate: '+18%' },
    { title: 'Space Exploration', description: 'Expanding frontiers, technological advancements, and potential for significant long-term returns.', returnRate: '+30%' },
    { title: 'Virtual and Augmented Reality (VR/AR)', description: 'Emerging technologies, expanding applications, and high-growth potential.', returnRate: '+22%' },
    { title: 'Sustainable Investing', description: 'Growing awareness, increasing demand for ESG-focused investments, and potential for long-term impact.', returnRate: '+15%' },
    { title: 'Startups', description: 'High-risk, high-reward potential, opportunity to invest early and benefit from significant growth.', returnRate: '+35%' },
  ];

  return (
    <div className="investment-container">
      <h1 className="investment-title">Best Areas to Invest In</h1>
      <div className="investment-list">
        {investmentAreas.map((area, index) => (
          <div key={index} className="investment-item">
            <h2>{area.title}</h2>
            <p>{area.description}</p>
            <span className="return-rate">Expected Returns: <strong>{area.returnRate}</strong></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentAreas;
