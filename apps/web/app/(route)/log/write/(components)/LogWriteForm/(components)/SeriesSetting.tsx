import { Selectbox } from '@repo/ui/SelectBox';
// import { UseFormSetValue } from 'react-hook-form';
// import { LogFormData } from '../LogWriteForm';
// import { CommunityFormData } from '@/(route)/community/write/(components)/CommunityWriteForm';

interface SeriesSettingProps {
  setValue: any;
  selectList: Array<any>;
}

function SeriesSetting({ setValue, selectList }: SeriesSettingProps) {
  const handleSelectChange = (data: any) => {
    setValue('series', data.value);
  };

  return (
    <Selectbox
      width='short'
      placeholder='시리즈를 선택하세요'
      selectList={selectList}
      onChange={data => handleSelectChange(data)}
    />
  );
}

export default SeriesSetting;
