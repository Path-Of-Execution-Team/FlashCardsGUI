'use client';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import GradientButton from '@/components/GradientButton';
import CowLogoIcon from '@/icons/CowLogoIcon';

type AuthFormCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onSubmit: () => void;
  linkText: string;
  linkHref: string;
  serverError: string | null;
  isSubmitting: boolean;
  submitButtonText: string;
  isSubmittingText: string;
};

const AuthFormCard = ({
  title,
  subtitle,
  children,
  onSubmit,
  linkText,
  linkHref,
  serverError,
  isSubmitting,
  submitButtonText,
  isSubmittingText,
}: AuthFormCardProps) => {
  return (
    <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: { xs: '100%', md: '40%' } }}>
      <Card
        sx={{
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          backdropFilter: 'blur(10px)',
        }}>
        <Typography variant="h4" component="h2" sx={{ pt: 3, textAlign: 'center' }}>
          <CowLogoIcon sx={{ fontSize: 128 }} /> {title}
        </Typography>

        <Typography variant="subtitle2" component="h3" sx={{ pt: 1, pb: 1, textAlign: 'center' }}>
          {subtitle}
        </Typography>

        <CardContent>
          <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {children}
            <GradientButton
              data-testid="submit-button"
              type="submit"
              disabled={isSubmitting}
              from="#FE6B8B"
              to="#FF8E53"
              shadowColor="rgba(254, 124, 111, 0.7)">
              {isSubmitting ? isSubmittingText : submitButtonText}
            </GradientButton>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link href={linkHref} variant="body2" sx={{ display: 'block', marginTop: 2, textAlign: 'center' }} data-testid="another-action-link">
              {linkText}
            </Link>
          </Box>
        </CardContent>
      </Card>
      {serverError && (
        <Alert severity="error" sx={{ width: '100%' }}>
          {serverError}
        </Alert>
      )}
    </Box>
  );
};

export default AuthFormCard;
