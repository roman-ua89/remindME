import { screen, fireEvent, prettyDOM } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '@/app/utils/test-utils';
import { Form } from '@/app/features/SingleNote';
import { request, gql } from 'graphql-request';
import { userEvent } from '@testing-library/user-event';
import { getSingleNoteById } from '@/app/shared/actions';

jest.mock('graphql-request', () => ({
    request: jest.fn(), // Mock the request function
    gql: jest.fn(),
}));

jest.mock('@/app/shared/actions', () => ({
    ...jest.requireActual('@/app/shared/actions'),
    getSingleNoteById: jest.fn()
}));

describe('Create Single Note component', () => {
    const mockRequest = request as jest.Mock;
    const mockGql = gql as jest.Mock;
    const mockGetNoteById = getSingleNoteById as jest.Mock;

    beforeEach(() => {
        // Reset mocks before each test to ensure isolation
        mockRequest.mockReset();
        mockGql.mockReset();
        mockGetNoteById.mockReset();
    });

    it('Should show text input and textarea', () => {
        renderWithProviders(<Form />);

        const textInput = screen.getByRole('textbox', { name: /Terminology/i });
        const textarea = screen.getByRole('textbox', { name: /Explanation/i });

        expect(textInput).toBeInTheDocument();
        expect(textarea).toBeInTheDocument();
    });

    test('Symbol counter', () => {
        renderWithProviders(<Form />);

        const textInput = screen.getByRole('textbox', { name: /Terminology/i });
        const textarea = screen.getByRole('textbox', { name: /Explanation/i });

        const termSymbolCounter = screen.getByLabelText('Term symbol counter');
        const explanationSymbolCounter = screen.getByLabelText('Explanation symbol counter');

        expect(termSymbolCounter).toBeInTheDocument();
        expect(explanationSymbolCounter).toBeInTheDocument();

        expect(termSymbolCounter).toHaveTextContent('0');
        expect(explanationSymbolCounter).toHaveTextContent('0');

        fireEvent.change(textInput, { target: { value: 'Some term 20 symbols' } });
        fireEvent.change(textarea, { target: { value: 'Some explanation 27 symbols' } });

        expect(termSymbolCounter).toHaveTextContent('20');
        expect(explanationSymbolCounter).toHaveTextContent('27');
    });

    test('Save and reset buttons', async () => {
        renderWithProviders(<Form />);

        const textInput = screen.getByRole('textbox', { name: /Terminology/i });
        const textarea = screen.getByRole('textbox', { name: /Explanation/i });
        const saveBtn = screen.getByRole('button', { name: 'Save' });

        // with empty text fields Reset button should not be visible
        expect(saveBtn).toBeInTheDocument();
        expect(saveBtn).toBeDisabled();
        expect(screen.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument();

        fireEvent.change(textInput, { target: { value: 'Some term' } });
        fireEvent.change(textarea, { target: { value: 'Some explanation' } });

        // after text input are filled in, Reset button appears on the page
        expect(saveBtn).toBeEnabled();
        expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();

        // after clicking on Reset button, text fields should become empty
        // Reset button disappears
        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        await userEvent.click(resetBtn);
        expect(textInput).toHaveTextContent('');
        expect(textarea).toHaveTextContent('');
        expect(screen.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument();
    });

    test('Edit mode. Text fields should not be empty', async () => {
        const mockData = { id: 2, term: 'some term', explanation: 'some explanation' };

        mockGetNoteById.mockImplementation(() => {
            return mockData;
        })

        renderWithProviders(<Form id="1" />);
        await new Promise((resolve) => setTimeout(resolve, 0));

        const textInput = screen.getByRole('textbox', { name: /Terminology/i });
        const textarea = screen.getByRole('textbox', { name: /Explanation/i });
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        const resetBtn = screen.queryByRole('button', { name: 'Reset' });

        expect(textInput).toHaveValue(mockData.term);
        expect(textarea).toHaveValue(mockData.explanation);
        expect(saveBtn).toBeDisabled();
        expect(resetBtn).not.toBeInTheDocument();

    });
});
