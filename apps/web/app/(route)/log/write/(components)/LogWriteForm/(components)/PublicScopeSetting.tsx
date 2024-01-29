import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface PublicScopeSettingProps {
  register: UseFormRegisterReturn<'publicScope'>;
}

function PublicScopeSetting({ register }: PublicScopeSettingProps) {
  return <div>PublicScopeSetting</div>;
}

export default PublicScopeSetting;
