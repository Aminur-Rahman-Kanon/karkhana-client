import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../utils/utils';
import { useRepoData } from './hooks';

test('should successfully query hook', async () => {
    const { result } = renderHook(() => useRepoData(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    await expect(result.current.status).toEqual('success');
})