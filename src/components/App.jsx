import { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from '../components/FeedbackOptions/FeedbackOptions';
import { Statistics } from '../components/Statistics/Statistics';
import { Notification } from '../components/Notification/Notification';
import { Layout } from './Layout/Layout.styled';
import { BtnSection } from './Section/Section.styled';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = option => {
    switch (option) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => good + neutral + bad;
  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100) || 0;
  };
  const total = countTotalFeedback();

  return (
    <Layout>
      <Section title="Please leave feedback">
        <BtnSection>
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={handleFeedback}
          />
        </BtnSection>
        {!total ? (
          <Notification message={'There is no feedback'} />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </Layout>
  );
};
