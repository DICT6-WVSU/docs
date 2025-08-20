import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Ethical Framework',
    Svg: require('@site/static/img/undraw_artificial-intelligence_43qa.svg').default,
    description: (
      <>
        A comprehensive ethical framework guiding the development and deployment of AI systems in public services,
        ensuring fairness, accountability, and transparency.
      </>
    ),
  },
  {
    title: 'Public Service Integration',
    Svg: require('@site/static/img/undraw_chat-with-ai_ir62.svg').default,
    description: (
      <>
        Seamless integration of AI solutions with existing public service infrastructure,
        enhancing efficiency while maintaining human oversight and control.
      </>
    ),
  },
  {
    title: 'Responsible Development',
    Svg: require('@site/static/img/undraw_proud-coder_bivp.svg').default,
    description: (
      <>
        Best practices and guidelines for developing AI systems that respect privacy,
        ensure security, and promote the public good.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
