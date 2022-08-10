interface Props {
  icon: string;
}

const IconImport = ({ icon }: Props) => {
  const Icon = require(`public/images/icons/${icon}.svg`).default;

  return <Icon />;
};

export default IconImport;
