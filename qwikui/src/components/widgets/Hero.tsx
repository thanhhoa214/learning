import { range } from 'lodash-es';

import {
  component$,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';

import { QuiAlert } from '../atoms/alert/Alert';
import { Badge } from '../atoms/badge/Badge';
import { Breadcrumb } from '../atoms/breadcrumb/Breadcrumb';
import {
  QuiButton,
  QuiButtonSize,
  QuiButtonTheme,
} from '../atoms/button/';
import { SelectableCard } from '../atoms/card/SelectableCard';
import { EmptyState } from '../atoms/empty-state/EmptyState';
import { LozengeType } from '../atoms/lozenge/types';
import { Pagination } from '../atoms/pagination/Pagination';
import { Switch } from '../atoms/switch/Switch';
import { Tooltip } from '../atoms/tooltip/Tooltip';

export default component$(() => {
  useStylesScoped$(`
  section h2 {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 16px;
  }
  `);

  const buttonThemes: QuiButtonTheme[] = ['primary-blue', 'rose', 'green', 'secondary', 'invert'];
  const buttonSizes: QuiButtonSize[] = ['small', 'medium', 'big', 'giant'];
  const lozengeTypes: LozengeType[] = ['neutral', 'error', 'warning', 'success', 'note'];

  const selectedPage = useSignal(3);
  return (
    <div class="space-y-4 p-4">
      <QuiAlert title="Empty State">
        <div class="flex">
          <EmptyState></EmptyState>
          <EmptyState size="medium"></EmptyState>
          <EmptyState>
            <QuiButton>Clear all filters</QuiButton>
          </EmptyState>
          <EmptyState size="medium">
            <QuiButton>Clear all filters</QuiButton>
          </EmptyState>
        </div>
      </QuiAlert>
      <QuiAlert title="Tooltip">
        <div class="flex flex-col gap-2">
          <Tooltip>
            Hello World
            <span q:slot="tooltip">
              Hello world Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit rem ut
              voluptates optio consequuntur aspernatur excepturi nam cumque eligendi ab.
            </span>
          </Tooltip>
        </div>
      </QuiAlert>

      <QuiAlert title="Switch">
        <Switch
          items={[
            { key: 'primary', value: 'primary' },
            { key: 'secondary', value: 'secondary' },
            { key: 'invert', value: 'invert' },
          ]}
          selectedKey="primary"></Switch>
      </QuiAlert>

      <QuiAlert title="Pagination">
        <div class="flex flex-col gap-2">
          {range(1, 20).map((index) => (
            <Pagination pageCount={20} selectedPage={index}></Pagination>
          ))}
          <Pagination pageCount={20} selectedPage={selectedPage.value}></Pagination>
          <Pagination pageCount={1} selectedPage={selectedPage.value}></Pagination>
          <Pagination pageCount={1} selectedPage={1}></Pagination>
          <Pagination pageCount={8} selectedPage={1}></Pagination>
          <Pagination pageCount={8} selectedPage={8}></Pagination>
        </div>
      </QuiAlert>

      <QuiAlert title="Lozenges">
        <div class="flex gap-2">
          {lozengeTypes.map((type) => (
            <span class={`qui-lozenge qui-lozenge-${type}`}>{type.toUpperCase()}</span>
          ))}
        </div>
      </QuiAlert>

      <QuiAlert title="Selectable Card">
        <div class="flex gap-2">
          <SelectableCard name="selectable1" id="opt11">
            <strong q:slot="title">Title</strong>
            Ut labore et dolore magna aliqua
          </SelectableCard>

          <SelectableCard checked name="selectable1" id="opt12">
            <span q:slot="title">Title</span>
            Ut labore et dolore magna aliqua
          </SelectableCard>

          <SelectableCard name="selectable1" id="opt13" disabled>
            <strong q:slot="title">Disabled</strong>
            Ut labore et dolore magna aliqua
          </SelectableCard>

          <SelectableCard checked disabled name="selectable1" id="opt14">
            <span q:slot="title">Title</span>
            Ut labore et dolore magna aliqua
          </SelectableCard>
        </div>
        <div class="mt-4 flex gap-2">
          <SelectableCard direction="horizontal" name="selectable" id="opt1">
            <strong q:slot="title">Title</strong>
            Ut labore et dolore magna aliqua
          </SelectableCard>

          <SelectableCard direction="horizontal" checked name="selectable" id="opt2">
            <span q:slot="title">Title</span>
            Ut labore et dolore magna aliqua
          </SelectableCard>

          <SelectableCard direction="horizontal" name="selectable" id="opt3" disabled>
            <strong q:slot="title">Disabled</strong>
            Ut labore et dolore magna aliqua
          </SelectableCard>

          <SelectableCard direction="horizontal" checked disabled name="selectable" id="opt4">
            <span q:slot="title">Title</span>
            Ut labore et dolore magna aliqua
          </SelectableCard>

          <SelectableCard direction="horizontal" name="selectable" id="opt5">
            <strong q:slot="title">Normal</strong>
            Ut labore et dolore magna aliqua
          </SelectableCard>
        </div>
      </QuiAlert>

      <QuiAlert title="Buttons">
        <p>Button themes</p>
        <div class="flex flex-wrap gap-2">
          {buttonThemes.map((theme) => (
            <QuiButton theme={theme} key={theme} iconProps={{ package: 'basic', name: 'star' }}>
              Active Button
            </QuiButton>
          ))}
        </div>

        <p>Button sizes</p>
        <div class="flex flex-wrap items-center gap-2">
          {buttonSizes.map((size) => (
            <QuiButton size={size} key={size} iconProps={{ package: 'basic', name: 'star' }}>
              Active Button
            </QuiButton>
          ))}
        </div>
      </QuiAlert>

      <QuiAlert title="Breadcrumb">
        <Breadcrumb
          items={[
            { text: 'Home', href: '/' },
            { text: 'Breadcrumb 1', href: '/bre1' },
            { text: 'Breadcrumb 2' },
          ]}></Breadcrumb>
      </QuiAlert>

      <QuiAlert title="Alert">
        <div class="space-y-2">
          <QuiAlert title="Insert alert title here!">Alert description goes here.</QuiAlert>
          <QuiAlert title="Insert alert title here!" type="error">
            Alert description goes here.
          </QuiAlert>
          <QuiAlert title="Insert alert title here!" type="warning">
            Alert description goes here.
          </QuiAlert>
          <QuiAlert title="Insert alert title here!" type="information">
            Alert description goes here.
          </QuiAlert>
          <QuiAlert title="Insert alert title here!" type="success">
            Alert description goes here.
          </QuiAlert>
        </div>
      </QuiAlert>

      <QuiAlert title="Badges">
        <div class="flex flex-wrap gap-2">
          <Badge status="active">Active badge</Badge>
          <Badge status="active" size="tiny">
            Active badge
          </Badge>
          <Badge status="hovered">Hovered badge</Badge>
          <Badge status="pressed">Pressed badge</Badge>
          <Badge status="disabled">Disabled badge</Badge>
          <Badge status="inactive">Inactive badge</Badge>
        </div>
      </QuiAlert>
    </div>
  );
});
