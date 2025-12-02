import Box from '@mui/material/Box';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

type LinearProgressWithLabelProps = LinearProgressProps & {
  value: number;
  strength: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
};

function LinearProgressWithLabel(props: LinearProgressWithLabelProps) {
  const { value, strength, color, ...other } = props;
  const t = useTranslations();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 1, alignItems: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" {...other} value={value} color={color} />
      </Box>
      <Box sx={{ minWidth: 35, alignSelf: 'flex-end', marginTop: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{`${t(strength)}`}</Typography>
      </Box>
    </Box>
  );
}
export default LinearProgressWithLabel;
