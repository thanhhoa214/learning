import { TemplateDetailReadDto, TemplateUpdateDto } from 'src/generated';
export function convertTemplateDetailReadDtoToTemplateIdPut(
  templateDetailReadDto: TemplateDetailReadDto
): TemplateUpdateDto {
  const { boxes, name, description } = templateDetailReadDto;
  return {
    name,
    description,
    tags: description,
    boxes: boxes,
  };
}
